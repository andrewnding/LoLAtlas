import React from 'react'
import { Link } from 'react-router-dom'

export default class Blog extends React.Component {
  componentDidMount() {
    document.title = 'LoLAtlas - Blog'
  }

  render() {
    return (
      <div className="info-page">
        <h1 className="page-title">Blog</h1>
        <div className="info-block">
          <h2>November 26, 2017</h2>
          <p>
            Runes reforged data will be made available soon. The data is currently available, but only
            through a kind of roundabout way. Once the data is made officially available, the runes
            data will be added to the live game page.
          </p>
        </div>
        <div className="info-block">
          <h2>November 12, 2017</h2>
          <p>
            Welcome to LoLAtlas! I'll use this blog as a place to put information that probably isn't worthy
            of being on the <Link to="/about"> About </Link> page, as well as general announcements,
            progress reports, and anything else I can think of. This first blog post will just detail
            why I created LoLAtlas and why I believe it can be a really helpful tool for everyone.
          </p>
          <p>
            My inspiration for creating LoLAtlas came from realizing the value that can be gained from
            some of the existing live game tools. Being able to see everyone's ranks, win rates, and
            most commonly played champions really helped me get a feeling of who on my team would be
            dependable and who on the other team might be prone to making mistakes. Despite the usefulness
            of these tools, I often found myself looking up summoners individually anyway because I
            felt that the information was lacking. This repetitive process lead me to think of ways that
            I could speed up this process, and eventually gave me the idea to create LoLAtlas.
          </p>
          <p>
            The idea behind LoLAtlas is to quickly and concisely provide information about each player
            that may help you guess how they might perform. For example, everyone knows that League of 
            Legends can be an emotionally-charged game, so players coming off of a recent win or loss may
            be in a different mindset than they normally would be in. LoLAtlas not only shows winning
            streaks and losing streaks, it also indicates how recently players won or lost a game. 
            Another example is that some players may take ranked matches less seriously than others and 
            practice unfamiliar champions in a ranked match. LoLAtlas shows each player's current champion's
            mastery as well as the last time they played that champion. These are just a couple of examples
            of existing features, and more will be added in the future.
          </p>
          <p>
            That's it for this first blog post. If there's something else you would like me to talk about,
            <Link to="/contact"> contact me </Link> with suggestions and I might address it in the future.
          </p>
        </div>
      </div>
    )
  }
}