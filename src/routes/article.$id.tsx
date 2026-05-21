import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/article/$id")({
  head: () => ({ meta: [{ title: "Article — GenBridge" }] }),
  component: ArticlePage,
});

type Section = { subheading?: string; paragraphs?: string[]; bullets?: string[] };
type Article = { heading: string; intro?: string[]; sections: Section[] };

const ARTICLES: Record<string, Article> = {
  "logging-in": {
    heading: "How to Login on Any Website",
    intro: [
      "Navigating the digital world can feel overwhelming, but logging into websites securely and easily is completely manageable.",
      "Follow this step-by-step guide designed specifically to make online login simple, stress-free, and safe for you.",
    ],
    sections: [
      {
        subheading: "Step 1: Open Your Internet Browser",
        paragraphs: [
          "Open Google Chrome, Microsoft Edge, Safari, or any internet browser on your phone or computer. These are the apps you use to look at things on the internet.",
        ],
      },
      {
        subheading: "Step 2: Reach the Correct Website",
        bullets: [
          "At the top search bar, type the website name (for example: youtube) and press the Enter key on your keyboard.",
          "Select the correct result from the displayed list. Usually, it will be the very first one. Click on it to reach the website.",
          "Sometimes, instead of a website name, you will type a direct web address to ensure you are going to the right place. This is very important when you are accessing bank or government websites. You can copy and paste it or carefully type it into the top address bar.",
          "Try practicing with our platform address: https://genbridge-for-senior-citizens.lovable.app/",
        ],
      },
      {
        subheading: "Step 3: Find the Login Button",
        paragraphs: [
          "Look at the top right or main menu of the webpage for buttons labeled Login, Sign In, My Account, or User Login. Click this button to proceed.",
        ],
      },
      {
        subheading: "Step 4: Enter Your Credentials",
        paragraphs: [
          "Type your name, registered mobile number, or email ID slowly and carefully into the first box.",
        ],
      },
      {
        subheading: "Step 5: Enter Your Password",
        bullets: [
          "Type your password into the password box. The letters will usually be hidden by dots or stars to keep them safe from anyone looking over your shoulder.",
          "A strong password should use letters, numbers, and symbols like @, *, or $. Make it easy for you to remember, but not so simple that someone else could guess it.",
        ],
      },
      {
        subheading: "Step 6: Click Login or Sign In",
        paragraphs: [
          "Once your details are filled, press the Login or Sign In button.",
        ],
      },
      {
        subheading: "Step 7: OTP Verification (If Requested)",
        paragraphs: [
          "Some secure websites will send a temporary code called an OTP (One-Time Password) via SMS to your mobile phone. Check your phone messages, type that number code into the verification box on the screen, and press continue.",
        ],
      },
      {
        subheading: "Step 8: Successfully Logged In!",
        paragraphs: [
          "You have made it! You can now securely use all of the website's personalized features and services.",
        ],
      },
      {
        subheading: "Step 9: Always Log Out When Finished",
        paragraphs: [
          "When you are completely finished using a website — especially for sensitive tasks like online banking or shopping — always click the Log Out or Sign Out button. This is usually located in the top right corner of the screen. Once logged out, you can safely close your browser window.",
        ],
      },
      {
        subheading: "Important Safety Tips",
        bullets: [
          "Keep It Private: Never share your password with anyone. Keep your login details completely private.",
          "Write It Down Safely: If needed, write your passwords down in a physical notebook kept in a secure place at home.",
          "Always Sign Out: Make it a habit to log out as soon as your work is finished.",
          "Spot the Scams: Beware of offers that seem \"too good to be true\". Never click on unexpected links in emails or messages claiming you have won a prize or must \"verify your account urgently\". These are likely scams. Only use trusted websites.",
        ],
      },
      {
        subheading: "Practice Activity!",
        paragraphs: [
          "Now that you have learned how to login, why don't you try practicing on our website?",
          "It is completely optional, but logging in unlocks helpful features like bookmarking your favorite lessons, joining the group chat to converse with fellow learners, and tracking your achievements with badges! In fact, we have a special milestone badge waiting just for you the moment you log in after finishing this lesson.",
          "Give it a try! Look for our login button at the top of the page and follow the simple steps you practiced today. (Remember, you can always come back and try this activity at a later time, too!)",
        ],
      },
    ],
  },
};

function ArticlePage() {
  const { id } = Route.useParams();
  const article = ARTICLES[id] ?? ARTICLES["logging-in"];

  function handlePrint() {
    if (typeof window !== "undefined") window.print();
  }

  return (
    <>
      <section className="unified-panel article-standalone-panel">
        <button type="button" className="article-download-btn" onClick={handlePrint}>
          ⬇ Download / Print
        </button>
        <article className="article-view article-standalone-body">
          <h1>{article.heading}</h1>
          {article.intro?.map((p, i) => (
            <p key={`intro-${i}`}>{p}</p>
          ))}
          {article.sections.map((s, i) => (
            <section key={i}>
              {s.subheading && <h2>{s.subheading}</h2>}
              {s.paragraphs?.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {s.bullets && (
                <ul>
                  {s.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </section>

      <div className="hub-pagination-row">
        <Link to="/lessons" className="hub-btn">Back to Lessons</Link>
      </div>
    </>
  );
}