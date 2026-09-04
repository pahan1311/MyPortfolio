import { profile, nav } from "../data/content";

export default function Sidebar({ activeId }) {
  return (
    <aside>
      <div>
        <div className="id-block">
          <div className="name display">{profile.name}</div>
          <div className="role">{profile.role}</div>
          <div className="status">
            <span className="dot"></span>
            {profile.status}
          </div>
        </div>
        <nav>
          <ul>
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  data-idx={item.idx}
                  className={activeId === item.id ? "active" : ""}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="sidebar-foot">
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
      </div>
    </aside>
  );
}
