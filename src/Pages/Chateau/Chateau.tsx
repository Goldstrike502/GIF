import { Action, Dispatch } from 'redux';
import { getChateauPostForRoute, getCurrentRoute, getHeaderPhotoFromCurrentChateauPost } from '../../Selectors';
import { StoreState } from '../../Types';
import { ChateauPost } from '../../Types/ContentTypes';
import { ChateauItem, ChateauListViewComponent } from './ChateauList';
import { ContentfulClient } from '../../Contentful';
import * as React from 'react';
import './Chateau.css';
import * as ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';

interface ChateauPageProps {
    chateauPosts?: ChateauPost[];
    selectedPost?: ChateauPost;
    headerPhoto?: string;
}
interface ChateauPageState {
}
function mapStateToProps(state: StoreState): ChateauPageProps {
    const selectedPost = getChateauPostForRoute(state, getCurrentRoute(state));

    return {
        chateauPosts: state.chateauPosts,
        headerPhoto: getHeaderPhotoFromCurrentChateauPost(selectedPost),
        selectedPost
    };
}
function mapDispatchToProps(dispatch: Dispatch<Action>): Partial<ChateauPageProps> {
    return { };
}

export class ChateauPageComponent extends React.Component<ChateauPageProps, ChateauPageState> {
    client = ContentfulClient;
    state = {
        selectedPost: undefined
    };
    componentWillReceiveProps(nextProps: ChateauPageProps) {
        return false;
    }
    
    backgroundStyle(): any {
        return {
            backgroundImage: this.props.headerPhoto ? `url('${this.props.headerPhoto}')` : '',
        };
    }
    render() {
        const selectedPost = this.props.selectedPost;
        return (
            <div className="container">
        <section className="chateau-page" style={this.backgroundStyle()}>
            <h1>{(selectedPost ? (selectedPost as ChateauPost).title : 'Chateau Cazaleres')}</h1>
        </section>
        <section className="content">
            {selectedPost ? 
                <ReactMarkdown 
                    source={(selectedPost as ChateauPost).description ? (selectedPost as ChateauPost).description : ''} 
                /> : 'Chateau Cazaleres'}
        </section>

        <ChateauListViewComponent>
            {this.props.chateauPosts ? this.props.chateauPosts
                .map((item: ChateauPost, i) => <ChateauItem key={i} item={item} />) : 'loading posts'}
        </ChateauListViewComponent>
        </div>);
    }
}
export const ChateauPage = connect(mapStateToProps, mapDispatchToProps)(ChateauPageComponent);