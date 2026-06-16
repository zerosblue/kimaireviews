import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for KimAI Reviews.',
}

export default function PrivacyPage() {
  const updated = '2026-06-16'

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: {updated}</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        {[
          {
            title: '1. Information We Collect',
            body: `KimAI Reviews (kimaireviews.com) is a static blog. We do not collect personal data directly. However, third-party services we use — such as Google AdSense and affiliate networks — may collect usage data such as IP address, browser type, and pages visited.`,
          },
          {
            title: '2. Cookies',
            body: `Google AdSense may place cookies on your device to serve personalized advertisements based on your visit to our site and other sites on the internet. You may opt out of personalized advertising by visiting Google's Ads Settings.`,
          },
          {
            title: '3. Affiliate Links',
            body: `Some links on this site are affiliate links. When you click an affiliate link, the destination site may track your visit using cookies. We do not receive or store any personal data from these clicks.`,
          },
          {
            title: '4. Google Analytics',
            body: `We may use Google Analytics to understand how visitors use this site. Google Analytics collects information such as how often you visit, which pages you visit, and what site you came from. We use this only to improve the site.`,
          },
          {
            title: '5. Third-Party Websites',
            body: `Our reviews contain links to third-party websites. This Privacy Policy does not apply to those sites. We encourage you to read the privacy policies of every website you visit.`,
          },
          {
            title: '6. Changes to This Policy',
            body: `We may update this Privacy Policy occasionally. We will post the new policy on this page with an updated date.`,
          },
          {
            title: '7. Contact',
            body: `Questions? Email us at: zerosblue7717@gmail.com`,
          },
        ].map(({ title, body }) => (
          <section key={title} className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600">{body}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
