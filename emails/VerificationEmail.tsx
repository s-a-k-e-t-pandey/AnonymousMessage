import {
    Html,
    Head,
    Body,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button
} from "@react-email/components";
import { format } from "path";

interface VerificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmail({username, otp} : VerificationEmailProps){
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Verification Code</title>  
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                        format: 'woff2',
                    }}
                    fontweight="400"
                    fontstyle="normal"
                ></Font>
            </Head>
            <Preview>Here&apos;s your verification code: {otp}</Preview>
            <Section>
                <Row>
                    <Heading as="h2">hello {username},</Heading>
                </Row>
                <Row>
                    <Text>
                        Thanks you for Registering. Please use the following verification code to verify your account.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        {otp}
                    </Text>
                </Row>
                <Row>
                    <Text>
                        If you did not register for this account, please ignore this email.
                    </Text>
                </Row>
            </Section>
        </Html>
    )
}