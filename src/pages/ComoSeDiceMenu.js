import '../css/App.css';
import HomeNavigationBar from '../components/NavigationBar.jsx'
import SinglePlayer from '../components/SinglePlayerCard.jsx'
import DailyChallenge from '../components/DailyChallengeCard.jsx'

/**
 * Como se dice menu page.
 * 
 * Contains the different game modes that are offered. Single player, Daily challenge, and Multiplayer.
 * 
 * @returns Como se dice menu page.
 */
function ComoSeDiceMenu() {
  return (
    <div>

      {/* Navigatin bar */}
      <HomeNavigationBar />

      {/* All four game modes. */}
      <div className='flex justify-center '>
        <div className='w-5/6'>
          <div className='grid gap-8 grid-cols-2'>

            <div>
              <SinglePlayer title="Start Singleplayer" body="Play cómo se dice alone" />
            </div>

            <div>
                <DailyChallenge destination="placeHolderForWhenMultiplayerPageIsCreated" title="Multiplayer" body="Start a room to play against friends!" />
            </div>

            <div>
              <DailyChallenge destination="placeHolderForWhenDailyChallengePageIsCreated"  title="Start Daily Challenge" body="Get as many words right in the shortest time and see where you stack up against the world 🌐! " />
            </div>

            <div>
              <DailyChallenge destination="placeHolderForWhenDailyChallengePageIsCreated" title="Join Multiplayer Room" body="Room code" />
            </div>

          </div>
        </div>
      </div>
      
    </div>
  );
}

export default ComoSeDiceMenu;
