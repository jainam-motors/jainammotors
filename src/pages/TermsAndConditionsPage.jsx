import { LegalPage } from "../components/LegalPage";

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="These Terms & Conditions govern your use of the Jainam Motors website and the information you submit through our enquiry forms."
      sections={[
        {
          title: "Website Usage",
          paragraphs: [
            "By using this website, you agree to access the content responsibly and only for lawful purposes. You must not attempt to disrupt the website, interfere with its operation or use it for fraudulent activity.",
          ],
        },
        {
          title: "Accuracy of Information",
          paragraphs: [
            "We aim to keep vehicle details, availability, offers and dealership information accurate and up to date. However, specifications, prices, stock status and promotional details may change without prior notice and should be confirmed directly with our team.",
          ],
        },
        {
          title: "Enquiry Disclaimer",
          paragraphs: [
            "Submitting an enquiry does not create a booking, reservation, loan approval or sale agreement. Any final vehicle availability, pricing, finance approval or delivery timeline will be confirmed separately by Jainam Motors.",
          ],
        },
        {
          title: "Intellectual Property",
          paragraphs: [
            "All website content, including text, images, layout, graphics, logos and trademarks, belongs to Jainam Motors or its licensors and is protected by applicable intellectual property laws. You may not copy, reproduce or redistribute content without permission.",
          ],
        },
        {
          title: "External Links",
          paragraphs: [
            "This website may contain links to third-party websites or services. We are not responsible for the availability, content, privacy practices or terms of external websites.",
          ],
        },
        {
          title: "Limitation of Liability",
          paragraphs: [
            "To the fullest extent permitted by law, Jainam Motors shall not be liable for indirect, incidental or consequential losses arising from the use of this website, reliance on its content or temporary unavailability of the site.",
          ],
        },
        {
          title: "Governing Law",
          paragraphs: [
            "These Terms & Conditions are governed by the laws of India. Any disputes relating to the website or its use shall be subject to the jurisdiction of the competent courts in India.",
          ],
        },
        {
          title: "Contact Information",
          paragraphs: [
            "For questions regarding these Terms & Conditions, please contact Jainam Motors at jainammotors@gmail.com or call +91 95740 05036.",
          ],
        },
      ]}
    />
  );
}
