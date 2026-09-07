import "./whyme.css";

const features = [
  {
    title: "Total Audio-Visual Synergy:",
    text: "Putting together a video means more than just cutting the footage down. I add motion design, and then there are sound effects that go with the music. All of this helps build something that feels immersive and like a real narrative. I think the balance is what matters most here. It can feel overwhelming at times when everything needs to line up.",
  },
  {
    title: "Guaranteed Turnaround:",
    text: "YouTube algorithms reward consistency. Social calendars demand it too. You need your edits on time, polished and ready. I get them to you by the deadline, no exceptions.",
  },
  {
    title: "Tailored for Retention:",
    text: "Every frame keeps your audience watching. Works for long documentaries or quick short-form edits. Whatever the pace, it's built to hold attention.",
  },
];

export default function WhyMe() {
  return (
    <section className="whyme">
      {/* Background Image */}
      <div className="whyme-bg">
        <img src="/Back Picture.png" alt="" aria-hidden="true" />
      </div>

      {/* Dark + Red Overlay */}
      <div className="whyme-overlay"></div>

      {/* Content */}
      <div className="whyme-content">
        <h1 className="whyme-headline">
          Balanced Sound & Visuals. Deadlines Always Met.
          <br />
          Videos That Exceed Expectations.
        </h1>

        <p className="whyme-intro">
          Good video editing goes way beyond just cutting footage. Pacing,
          motion graphics, sound design, music — they all have to work
          together. That's what keeps people watching. I focus on YouTube
          content, documentaries, and fast social media shorts. Everything
          comes out broadcast-ready, fully finished. You get clear
          communication, quality work, and deadlines you can count on.
        </p>

        <div className="whyme-features">
          {features.map((feature, index) => (
            <div className="whyme-feature" key={index}>
              <p>
                <strong>{feature.title}</strong>{" "}
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}