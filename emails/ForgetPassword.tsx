import {
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  OTP: string;
}

export default function ForgetPasswordTemplate({ OTP }: Props) {
  const firstName = "there";

  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>

      <Section style={{ backgroundColor: "#f6f9fc", padding: "40px 0" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 8,
            padding: 24,
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          <Section style={{ textAlign: "center", paddingBottom: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
              RegComply AI
            </Text>
          </Section>

          <Section>
            <Text style={{ fontSize: 16, margin: "0 0 12px 0" }}>
              Hi {firstName},
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: "#475569",
                lineHeight: 1.5,
                margin: "0 0 16px 0",
              }}
            >
              We received a request to reset the password for your account. Copy
              the OPT below. This OTP will expire in 1 hour.
            </Text>

            <Section style={{ textAlign: "center", padding: "12px 0 18px" }}>
              <Button
                style={{
                  color: "#fff",
                  backgroundColor: "#432dd7",
                  borderRadius: 6,
                  textDecoration: "none",
                  padding: "12px 24px",
                }}
              >
                {OTP}
              </Button>
            </Section>
          </Section>

          <Section
            style={{
              borderTop: "1px solid #eef2f7",
              marginTop: 18,
              paddingTop: 12,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: "#94a3b8",
                textAlign: "center",
                margin: 0,
              }}
            >
              © {new Date().getFullYear()} RegComply AI. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Section>
    </Html>
  );
}
