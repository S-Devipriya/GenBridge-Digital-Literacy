import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/tryout/$id")({
  head: () => ({ meta: [{ title: "Practice Lab — GenBridge" }] }),
  component: TryoutLab,
});

const DEMO_PASS = "1234";
const DEMO_BANK_PIN = "5678";

type Step = {
  instruction: string;
  hint?: string;
};

const STEPS: Step[] = [
  { instruction: "There are many apps for paying online — Paytm, PhonePe, GooglePay and more. Today we will use GooglePay. Find the GooglePay icon on the phone and tap it." },
  { instruction: "Enter your screen-lock password to open GooglePay.", hint: `Use password: ${DEMO_PASS}` },
  { instruction: "Tap 'Pay anyone' to send money to a person." },
  { instruction: "Enter the phone number of the person you want to pay.", hint: "Try: 9876543210" },
  { instruction: "Here is the chat screen with that person. Tap 'Pay'." },
  { instruction: "Enter the amount you want to send and tap 'Proceed to pay'.", hint: "Try: ₹100" },
  { instruction: "Pick the bank account you want to pay from." },
  { instruction: "Enter your UPI PIN to authorise the payment.", hint: `Use PIN: ${DEMO_BANK_PIN}` },
  { instruction: "Done! Tap 'Send money' to complete the practice." },
];

function TryoutLab() {
  const [step, setStep] = useState(0);
  const [pwd, setPwd] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");

  const next = () => { setErr(""); setStep((s) => Math.min(s + 1, STEPS.length - 1)); };
  const prev = () => { setErr(""); setStep((s) => Math.max(s - 1, 0)); };

  function tryStep(action: "tap-gpay" | "submit-pwd" | "tap-pay-anyone" | "submit-phone" | "tap-pay" | "submit-amount" | "pick-bank" | "submit-pin" | "send") {
    setErr("");
    if (action === "tap-gpay" && step === 0) return next();
    if (action === "submit-pwd" && step === 1) {
      if (pwd === DEMO_PASS) return next();
      setErr("Try again. The password is " + DEMO_PASS);
      return;
    }
    if (action === "tap-pay-anyone" && step === 2) return next();
    if (action === "submit-phone" && step === 3) {
      if (phone.length >= 10) return next();
      setErr("Enter a 10-digit phone number.");
      return;
    }
    if (action === "tap-pay" && step === 4) return next();
    if (action === "submit-amount" && step === 5) {
      if (Number(amount) > 0) return next();
      setErr("Enter an amount greater than 0.");
      return;
    }
    if (action === "pick-bank" && step === 6) return next();
    if (action === "submit-pin" && step === 7) {
      if (pin === DEMO_BANK_PIN) return next();
      setErr("Try again. The PIN is " + DEMO_BANK_PIN);
      return;
    }
    if (action === "send" && step === 8) return setStep(STEPS.length);
  }

  return (
    <>
      <div className="split-layout">
        <aside className="unified-panel split-pane">
          <h2 className="course-side-heading">Practice: Sending a Payment</h2>
          <p className="course-side-meta">Follow the steps one at a time on the right.</p>

          {step < STEPS.length ? (
            <>
              <div className="tryout-instruction-step">
                <span className="tryout-step-num">Step {step + 1} of {STEPS.length}</span>
                <div>{STEPS[step].instruction}</div>
                {STEPS[step].hint && (
                  <p style={{ marginTop: "0.5rem", color: "#92400e", fontWeight: 700 }}>
                    {STEPS[step].hint}
                  </p>
                )}
              </div>
              {err && <p style={{ color: "#dc2626", fontWeight: 700 }}>{err}</p>}
              <div className="tryout-nav-row">
                <button className="tryout-nav-btn" onClick={prev} disabled={step === 0}>← Back</button>
                <button className="tryout-nav-btn" onClick={next}>Skip →</button>
              </div>
            </>
          ) : (
            <div className="tryout-instruction-step">
              <p className="lab-success">🎉 Great job! You practiced sending a payment.</p>
              <p style={{ textAlign: "center", marginTop: "0.5rem" }}>No real money was used.</p>
            </div>
          )}
        </aside>

        <section className="unified-panel">
          <div className="virtual-lab">
            <p className="lab-screen-title">Virtual Phone</p>
            <div className="phone-frame">
              {/* Step 0: home screen */}
              {step === 0 && (
                <>
                  <p className="lab-screen-title">Home Screen</p>
                  <div className="app-grid">
                    <div className="app-icon"><span className="app-icon-glyph">📷</span>Camera</div>
                    <div className="app-icon"><span className="app-icon-glyph">📞</span>Phone</div>
                    <div className="app-icon"><span className="app-icon-glyph">💬</span>Messages</div>
                    <button type="button" className="app-icon is-target" onClick={() => tryStep("tap-gpay")}>
                      <span className="app-icon-glyph">💳</span>GooglePay
                    </button>
                    <div className="app-icon"><span className="app-icon-glyph">📧</span>Email</div>
                    <div className="app-icon"><span className="app-icon-glyph">⚙️</span>Settings</div>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <p className="lab-screen-title">Unlock GooglePay</p>
                  <input className="lab-input" type="password" placeholder="Enter password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                  <button className="lab-btn" onClick={() => tryStep("submit-pwd")}>Unlock</button>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="lab-screen-title">GooglePay</p>
                  <button className="lab-list-item" onClick={() => tryStep("tap-pay-anyone")}>👤 Pay anyone</button>
                  <div className="lab-list-item">🏦 Pay bills</div>
                  <div className="lab-list-item">📱 Mobile recharge</div>
                </>
              )}

              {step === 3 && (
                <>
                  <p className="lab-screen-title">Enter phone number</p>
                  <input className="lab-input" inputMode="numeric" placeholder="10-digit phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <button className="lab-btn" onClick={() => tryStep("submit-phone")}>Next</button>
                </>
              )}

              {step === 4 && (
                <>
                  <p className="lab-screen-title">Chat with {phone || "user"}</p>
                  <div className="lab-list-item">Hi there!</div>
                  <div className="lab-list-item" style={{ textAlign: "right" }}>Hello! 👋</div>
                  <button className="lab-btn" onClick={() => tryStep("tap-pay")}>💸 Pay</button>
                </>
              )}

              {step === 5 && (
                <>
                  <p className="lab-screen-title">Enter amount</p>
                  <input className="lab-input" inputMode="numeric" placeholder="₹ 0" value={amount} onChange={(e) => setAmount(e.target.value)} />
                  <button className="lab-btn" onClick={() => tryStep("submit-amount")}>Proceed to pay</button>
                </>
              )}

              {step === 6 && (
                <>
                  <p className="lab-screen-title">Choose bank</p>
                  <button className="lab-list-item" onClick={() => tryStep("pick-bank")}>🏦 State Bank — •••1234</button>
                  <div className="lab-list-item">🏦 HDFC — •••5678</div>
                </>
              )}

              {step === 7 && (
                <>
                  <p className="lab-screen-title">Enter UPI PIN</p>
                  <input className="lab-input" type="password" inputMode="numeric" placeholder="4-digit PIN" value={pin} onChange={(e) => setPin(e.target.value)} />
                  <button className="lab-btn" onClick={() => tryStep("submit-pin")}>Confirm</button>
                </>
              )}

              {step === 8 && (
                <>
                  <p className="lab-screen-title">Confirm payment</p>
                  <p>To: {phone}</p>
                  <p>Amount: ₹{amount}</p>
                  <button className="lab-btn" onClick={() => tryStep("send")}>Send money</button>
                </>
              )}

              {step >= STEPS.length && (
                <p className="lab-success">✅ Payment sent (practice)</p>
              )}
            </div>
          </div>
        </section>
      </div>

      <div className="hub-pagination-row">
        <Link to="/lessons" className="hub-btn">Back to Lessons</Link>
      </div>
    </>
  );
}
