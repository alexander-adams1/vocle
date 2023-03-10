import {useState}  from 'react';
import Singleplayer from '../mainPages/Singleplayer';
import {
    BrowserRouter as Router,
    Routes,
    useNavigate,
    Route,
    Link,
  } from "react-router-dom";
import { render } from '@testing-library/react';
import Home from '../mainPages/Home';
import Inputplaylistsingle from './inputplaylistsingle';
import { setResultMap } from '../resultMap';
import { generateTrack } from '../audioImplementation/GenerateSong';

// Dictates the functionality for the modal that pops up when single player is clicked
const Questionsingle = () => 
{
    const navigate = useNavigate();

    // Dictates functionality for routing to the singleplayer page (which gets called in onClick below)
    const navigatetoSingleplayer = async () => 
    {
        setResultMap(await generateTrack(`https://open.spotify.com/playlist/37i9dQZEVXbLRQDuF5jeBp`))
        navigate('/singleplayer', {state:{id:1,name:'default'}})
    }

    const[custom, setCustom] = useState(false);
    let customPlaylist = null;
    let modals = null;

    // Gets called when default playlist option is selected
    function changeCustom()
    {
        setCustom(true)
    }
    // Prompts the user to input their default playlist
    if (custom) {
        console.log("im being called");
        return(
            <div>
                <Inputplaylistsingle />
            </div>
        )
        customPlaylist = null;
        
    }

    console.log('calling on my phone')
    if(!custom)
    {
    return (
        <div className="v54_46">
            <div className="v46_8">
                <button className="v46_9">
                <span className="v46_10" onClick={navigatetoSingleplayer}>Use Default Playlist</span>
                </button>
            </div>
                <div className="v46_7">
            <button className="v46_6">
            <span className="v10_65" onClick={changeCustom}>Upload Your Own Playlist</span>
            </button>
            </div>
        </div>
            
    )
    }
    
};

export default Questionsingle;