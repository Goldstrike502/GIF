import { ChateauPost } from '../../Types/ContentTypes';
import { ChateauItem, ChateauListViewComponent } from './ChateauList';
import { CHATEAU_CONTENT_TYPE_ID, ContentfulClient } from '../../Contentful';
import { EntryCollection } from 'contentful';
import * as React from 'react';
import './Chateau.css';
import { match } from 'react-router';
import * as ReactMarkdown from 'react-markdown';

interface ChateauPageProps {
    match?: match<{post: string}>;
}
interface ChateauPageState {
    headerPhoto?: string;
    chateauPosts?: ChateauPost[];
    selectedPost?: ChateauPost;
}
export class ChateauPage extends React.Component<ChateauPageProps, ChateauPageState> {
    client = ContentfulClient;
    state = {
        headerPhoto: '/images/uploads/chateau.jpg',
        chateauPosts: [],
        selectedPost: undefined
    };
    componentWillReceiveProps(nextProps: ChateauPageProps) {
        if (nextProps.match && 
            this.props.match && nextProps.match.params.post !== this.props.match.params.post) {
                this.selectPostForMatchParam(nextProps.match.params.post);
        }
        return false;
    }
    constructor() {
        super();
        
        this.client.getEntries({content_type: CHATEAU_CONTENT_TYPE_ID})
        .then((entries: EntryCollection<ChateauPost>): ChateauPost[] => 
        entries.items.map((entry) => {
            return {
                id: entry.sys.id,
                ... entry.fields
            };
        }))
        .then(posts => {
            const state = {... this.state, chateauPosts: posts};
            this.setState({... state,
                chateauPosts: posts});

            if (this.props.match && this.props.match.params.post) {
                this.selectPostForMatchParam(this.props.match.params.post);
            }
        });
    }
    selectPostForMatchParam(slug: string) {
        const selectedPost = this.state.chateauPosts.find((post: ChateauPost) => post.slug === slug);
        const headerPhoto = selectedPost ?
             (selectedPost as ChateauPost).cover.fields.file.url : '/images/uploads/chateau.jpg';

        this.setState({... this.state, 
            headerPhoto,
            selectedPost}); 
    }
    hasPost() {
       return (this.props.match && this.props.match.params.post && this.state.chateauPosts.length > 0);
    }
    backgroundStyle(): any {
        return {
            backgroundImage: this.state.headerPhoto ? `url('${this.state.headerPhoto}')` : '',
        };
    }
    render() {
        const selectedPost = this.state.selectedPost;
        return (
            <div className="container">
        <section className="chateau-page" style={this.backgroundStyle()}>
            <h1>{(selectedPost ? (selectedPost as ChateauPost).title : 'Chateau Cazaleres')}</h1>
        </section>
        <section>
            {selectedPost ? 
                <ReactMarkdown 
                    source={(selectedPost as ChateauPost).description ? (selectedPost as ChateauPost).description : ''} 
                /> : 'Chateau Cazaleres'}
        </section>

        <ChateauListViewComponent>
            {this.state.chateauPosts
                .map((item: ChateauPost, i) => <ChateauItem key={i} item={item} />)}
        </ChateauListViewComponent>
        </div>);
    }
}