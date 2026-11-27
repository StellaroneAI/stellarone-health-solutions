import { useState, useRef, useEffect, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import { CheckCircle2, Loader2, MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitChatEnquiry } from "@/lib/enquiries.functions";
import { cn } from "@/lib/utils";
import { chatErrorMessage } from "@/lib/chat-errors";

const MAX_USER_MESSAGES = 12;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", company: "", organizationType: "", need: "", website: "" });
  const [leadState, setLeadState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      fetch: async (url, options) => {
        const response = await fetch(url, options);
        if (!response.ok) {
          const body: unknown = await response.json().catch(() => null);
          throw new Error(chatErrorMessage(body));
        }
        return response;
      },
    }),
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, showLead, leadState]);

  const busy = status === "submitted" || status === "streaming";
  const userCount = messages.filter((m) => m.role === "user").length;
  const limitReached = userCount >= MAX_USER_MESSAGES;

  function onSend(e: FormEvent) {
    e.preventDefault();
    const text = input.trim().slice(0, 1000);
    if (!text || busy || limitReached) return;
    void sendMessage({ text });
    setInput("");
  }

  const textOf = (m: (typeof messages)[number]) =>
    m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");

  async function onLead(e: FormEvent) {
    e.preventDefault();
    if (!lead.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email.trim())) {
      setLeadState("error");
      return;
    }
    setLeadState("sending");
    try {
      await submitChatEnquiry({
        data: {
          ...lead,
          transcript: messages
            .filter((m) => m.role === "user" || m.role === "assistant")
            .map((m) => ({ role: m.role as "user" | "assistant", text: textOf(m).slice(0, 4000) }))
            .slice(-40),
        },
      });
      setLeadState("sent");
    } catch {
      setLeadState("error");
    }
  }

  return (
    <>
      {!open ? (
        <Button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:bottom-6 sm:right-6"
        >
          <MessageSquare className="h-4 w-4 text-teal" aria-hidden="true" />
          Talk to StellarOne
        </Button>
      ) : null}

      {open ? (
        <section
          aria-label="StellarOne enquiry assistant"
          className="fixed inset-0 z-50 flex flex-col bg-background sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:max-h-[calc(100vh-3rem)] sm:w-[400px] sm:rounded-xl sm:border sm:border-border sm:shadow-2xl"
        >
          <header className="flex items-center justify-between gap-3 bg-navy px-4 py-3 text-primary-foreground sm:rounded-t-xl">
            <div className="flex items-center gap-3">
              <img src="/favicon.png" alt="" className="h-8 w-8 rounded-md bg-background p-0.5" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">StellarOne Enquiry Assistant</p>
                <p className="text-[11px] text-primary-foreground/70">Business enquiries · AI-assisted</p>
              </div>
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close chat" className="shrink-0 hover:bg-primary-foreground/10">
              <X className="h-5 w-5" />
            </Button>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <div className="rounded-lg bg-secondary/60 p-3 text-xs leading-relaxed text-muted-foreground">
              Hi! Ask about our RCM services, healthcare automation, Agentic AI or EasyMed. This assistant handles business enquiries only and does not give medical advice. Please do not share patient or other sensitive health information.
            </div>
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="ml-auto max-w-[85%] rounded-lg bg-navy px-3 py-2 text-sm text-primary-foreground">
                  {textOf(m)}
                </div>
              ) : (
                <div key={m.id} className="prose prose-sm max-w-none text-sm text-foreground">
                  <ReactMarkdown>{textOf(m)}</ReactMarkdown>
                  {!textOf(m) && busy && m.id === messages.at(-1)?.id ? <p className="flex items-center gap-2 text-xs text-muted-foreground"><Loader2 className="h-3 w-3 animate-spin" /> Preparing a response…</p> : null}
                  {!textOf(m) && !busy && !error ? <p className="text-xs text-muted-foreground">No answer was returned. You can send your enquiry to our team.</p> : null}
                </div>
              ),
            )}
            {status === "submitted" ? (
              <p className="flex items-center gap-2 text-xs text-muted-foreground"><Loader2 className="h-3 w-3 animate-spin" /> Thinking…</p>
            ) : null}
            {error ? (
              <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 p-2 text-xs text-destructive">
                {chatErrorMessage(error.message)}
              </p>
            ) : null}
            {limitReached ? (
              <p className="text-xs text-muted-foreground">Chat limit reached — please send your details to our team below.</p>
            ) : null}

            {showLead || limitReached ? (
              <div className="rounded-lg border border-border p-3">
                {leadState === "sent" ? (
                  <p className="flex items-start gap-2 text-sm text-navy" role="status">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> Thank you — our team will follow up at your work email.
                  </p>
                ) : (
                  <form onSubmit={onLead} className="space-y-2" noValidate>
                    <p className="text-sm font-semibold text-navy">Send this enquiry to our team</p>
                    <Input aria-label="Name" placeholder="Name *" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} maxLength={100} />
                    <Input aria-label="Work email" type="email" placeholder="Work email *" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} maxLength={255} />
                    <Input aria-label="Company" placeholder="Company" value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })} maxLength={100} />
                    <Input aria-label="Organization type" placeholder="Organization type" value={lead.organizationType} onChange={(e) => setLead({ ...lead, organizationType: e.target.value })} maxLength={100} />
                    <Input aria-label="What do you need help with" placeholder="What do you need help with?" value={lead.need} onChange={(e) => setLead({ ...lead, need: e.target.value })} maxLength={500} />
                    <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={lead.website} onChange={(e) => setLead({ ...lead, website: e.target.value })} />
                    {leadState === "error" ? <p role="alert" className="text-xs text-destructive">Please add your name and a valid work email, then try again.</p> : null}
                    <Button type="submit" variant="brand" size="sm" className="w-full" disabled={leadState === "sending"}>
                      {leadState === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Send to our team
                    </Button>
                  </form>
                )}
              </div>
            ) : null}
          </div>

          <div className="border-t border-border p-3">
            {!showLead && !limitReached ? (
              <Button type="button" variant="link" onClick={() => setShowLead(true)} className="mb-2 h-auto p-0 text-xs font-medium text-navy underline-offset-4 hover:underline">
                Send to our team →
              </Button>
            ) : null}
            <form onSubmit={onSend} className="flex items-center gap-2">
              <Input
                aria-label="Type your question"
                placeholder={limitReached ? "Chat limit reached" : "Ask about RCM, AI or EasyMed…"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={1000}
                disabled={limitReached}
              />
              {busy ? (
                <Button type="button" variant="outlineBrand" size="icon" onClick={() => void stop()} aria-label="Stop">
                  <X className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" variant="brand" size="icon" aria-label="Send" disabled={!input.trim() || limitReached} className={cn("shrink-0")}>
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </form>
          </div>
        </section>
      ) : null}
    </>
  );
}
