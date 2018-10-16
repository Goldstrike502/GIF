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
    console.log('mapstatechateau', getCurrentRoute(state), state);
    return {
        chateauPosts: state.chateauPosts,
        headerPhoto: getHeaderPhotoFromCurrentChateauPost(selectedPost),
        selectedPost
    };
}
function mapDispatchToProps(dispatch: Dispatch<Action>): Partial<ChateauPageProps> {
    return {};
}

export class ChateauPageComponent extends React.Component<ChateauPageProps, ChateauPageState> {
    client = ContentfulClient;
    state = {
        selectedPost: undefined
    };
    renderDefaultChateauPage() {
        return (
            <div>
                <p>Het luxe en gastvrije vakantiepark, Chateau Cazaleres ligt in Zuid Frankrijk tussen de Middellandse Zee en de Pyreneeën. Met meer dan 2000 uren zon per jaar dé ideale plek voor een onbezorgde en ontspannen vakantie. </p>
                <p>Op dit Nederlandse vakantiepark verhuren wij zeven luxe villa's. Voorzien van alle gemakken voor een comfortabele, gezellige en ontspannende vakantie. De trots van het park is het romantische Chateau Cazaleres, waarin alle faciliteiten zijn ondergebracht.</p>

                <p>In het hoogseizoen is Chateau Cazaleres dé plek in Zuid-Frankrijk voor gezinnen met kinderen. Op het veilige en ruim opgezette vakantiepark zijn alle faciliteiten aanwezig om het u en uw kinderen naar de zin te maken. Van professionele kinderanimatie (zes dagen per week), een speeltuin en speelweide, tennisbanen tot maar liefst drie schitterende zwembaden.</p>
                <p>Heeft u nog geen schoolgaande kinderen en wilt u op een rustiger moment de vele bezienswaardigheden in de omgeving bezoeken, dan zijn bijvoorbeeld de maanden mei en september bij uitstek de gelegenheid om naar Chateau Cazaleres te gaan.</p>
            </div>);
    }
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
                            source={(selectedPost as ChateauPost).content ? (selectedPost as ChateauPost).content : ''}
                        /> : this.renderDefaultChateauPage()}
                </section>

                <ChateauListViewComponent>
                    {this.props.chateauPosts ? this.props.chateauPosts
                        .map((item: ChateauPost, i) => <ChateauItem key={i} item={item} />) : 'loading posts'}
                </ChateauListViewComponent>
            </div>);
    }
}
export const ChateauPage = connect(mapStateToProps, mapDispatchToProps)(ChateauPageComponent);