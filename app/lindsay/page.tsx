import PunchMeOut from "../components/PunchMeOut";

/** ADÉLA - "Nicole Kidman": the song that plays on Lindsay's page. */
const NICOLE_KIDMAN_VIDEO =
  "https://www.youtube.com/embed/3sB4Iv_tM7U?autoplay=1";

export default function LindsayPage() {
  return (
    <PunchMeOut
      modalVideo={NICOLE_KIDMAN_VIDEO}
      modalMessage="Thank you for this"
      showSongToggle={false}
    />
  );
}
