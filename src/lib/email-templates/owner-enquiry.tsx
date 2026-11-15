import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  kind?: string
  name?: string
  email?: string
  company?: string
  fields?: { label: string; value: string }[]
  transcript?: { role: string; text: string }[]
}

const OwnerEnquiry = ({ kind = 'Website enquiry', name, email, company, fields = [], transcript = [] }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`New ${kind} from ${name ?? 'a visitor'}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>StellarOne Health</Text>
        <Heading style={h1}>New {kind}</Heading>
        <Section style={card}>
          <Text style={row}><strong>Name:</strong> {name || '—'}</Text>
          <Text style={row}><strong>Work email:</strong> {email || '—'}</Text>
          <Text style={row}><strong>Company:</strong> {company || '—'}</Text>
          {fields.filter((f) => f.value).map((f) => (
            <Text key={f.label} style={row}><strong>{f.label}:</strong> {f.value}</Text>
          ))}
        </Section>
        {transcript.length > 0 ? (
          <>
            <Hr style={hr} />
            <Heading as="h2" style={h2}>Chat transcript</Heading>
            {transcript.map((m, i) => (
              <Text key={i} style={row}><strong>{m.role === 'user' ? 'Visitor' : 'Assistant'}:</strong> {m.text}</Text>
            ))}
          </>
        ) : null}
        <Hr style={hr} />
        <Text style={foot}>Reply directly to the visitor at their work email above.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: OwnerEnquiry,
  subject: (d: Record<string, any>) => `New ${d['kind'] ?? 'website enquiry'}: ${d['name'] ?? 'visitor'}${d['company'] ? ` (${d['company']})` : ''}`,
  displayName: 'Owner enquiry notification',
  to: 'Praveen.Jayaraman@stellaronehealth.com',
  previewData: {
    kind: 'RCM assessment request', name: 'Jane Doe', email: 'jane@example.com', company: 'Example Clinic',
    fields: [{ label: 'Service', value: 'Denial Management' }],
    transcript: [{ role: 'user', text: 'Do you support behavioral health?' }, { role: 'assistant', text: 'Yes…' }],
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '600px' }
const brand = { color: '#0f766e', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, margin: 0 }
const h1 = { color: '#0b1f3a', fontSize: '22px', margin: '8px 0 16px' }
const h2 = { color: '#0b1f3a', fontSize: '16px', margin: '0 0 8px' }
const card = { backgroundColor: '#f4f7fa', borderRadius: '8px', padding: '12px 16px' }
const row = { color: '#1f2937', fontSize: '14px', lineHeight: '20px', margin: '4px 0' }
const hr = { borderColor: '#e5e7eb', margin: '20px 0' }
const foot = { color: '#6b7280', fontSize: '12px' }
