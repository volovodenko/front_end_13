import React, {Component} from 'react';
import {connect} from 'react-redux';

class About2 extends Component {
    render() {

        return (
            <div>
                <h3>
                    Params = {this.props.match.params.about ? this.props.match.params.about : 'About2'}
                </h3>
                <div>TrackName = {this.props.track ? this.props.track.name : 'No track'}</div>
                <div>This is About2 page</div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => { //'state' - store state
    return {
        // tracks: state.tracks //добавляеться в props свойство tracks с значением state
       track: state.tracks.find(track => Number(track.id) === Number(ownProps.match.params.about))
    }
};

export default connect(mapStateToProps)(About2);