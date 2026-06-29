import Link from "next/link";
import { FiArrowLeft, FiBell, FiEye, FiGlobe, FiLock } from "react-icons/fi";

const settings = [
  ["Privacy mode", "Control who can see your posts and profile activity.", FiLock],
  ["Notifications", "Tune replies, mentions, messages, and room alerts.", FiBell],
  ["Appearance", "Keep the luminous interface comfortable in all lighting.", FiEye],
  ["Language", "Choose regional formatting and community defaults.", FiGlobe],
];

export default function Settings() {
  return (
    <main className="simple-page premium-page">
      <section className="settings-card glass-panel">
        <Link href="/mainDashboard" className="ghost-button">
          <FiArrowLeft /> Back
        </Link>
        <h1>
          Account <span className="gradient-text">settings</span>
        </h1>
        <div className="settings-list">
          {settings.map(([title, copy, Icon]) => (
            <article className="notification-row" key={title}>
              <div className="post-author">
                <div className="brand-mark">
                  <Icon />
                </div>
                <div>
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </div>
              </div>
              <button className="ghost-button">Manage</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
