import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom';

class Tracks extends Component {

    addTrack() {
        const trackName = ReactDom.findDOMNode(this.refs.track).value;
        this.props.onAddTrack(trackName);
        ReactDom.findDOMNode(this.refs.track).value = '';
    }

    findTrack() {
        const trackName = ReactDom.findDOMNode(this.refs.search).value;
        this.props.onFindTrack(trackName);
    }



    render() {

        const list = this.props.tracksFilter.map((item) => {
            return (<li key={item.id}> <Link to={`about/${item.id}`}>{item.name}</Link></li>);
        });

        return (
            <section>
                <div>
                    <input type='text' ref='track'/>
                    <button onClick={::this.addTrack}>AddTrack</button>
                </div>
                <div>
                    <input type='text' ref='search'/>
                    <button onClick={::this.findTrack}>FindTrack</button>
                </div>
                <div>
                    <button onClick={this.props.onGetTracks}>Get Tracks</button>
                </div>
                <ul ref='list' id='list'>{list}</ul>
            </section>

        );

    }
}

export default Tracks;