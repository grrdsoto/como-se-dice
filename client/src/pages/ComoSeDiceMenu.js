import "../css/App.css";
import SinglePlayer from "../components/cards/SinglePlayerCard.jsx";
import DailyChallenge from "../components/cards/DailyChallengeCard.jsx";

/**
 * Como se dice menu page.
 *
 * Contains the different game modes that are offered. Single player, Daily challenge, and Multiplayer.
 *
 * @returns Como se dice menu page.
 */
function ComoSeDiceMenu() {
  return (
    <div className="h-full">
      {/* All four game modes. */}
      <div className="flex justify-center h-[70vh]">
        <div className="content-center w-3/5">
          <div className="grid gap-8 grid-cols-2">
            <SinglePlayer
              title="Start Singleplayer"
              body="Play cómo se dice alone"
            />

            <DailyChallenge
              destination="/comosedice/comingsoon"
              title="Multiplayer"
              body="Start a room to play against friends!"
            />

            <DailyChallenge
              destination="/comosedice/dailychallenge"
              title="Start Daily Challenge"
              body="Get as many words right in the shortest time and see where you stack up against the world 🌐! "
            />

            <DailyChallenge
              destination="/comosedice/comingsoon"
              title="Join Multiplayer Room"
              body="Room code"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComoSeDiceMenu;
