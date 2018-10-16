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
                            source={(selectedPost as ChateauPost).description ? (selectedPost as ChateauPost).description : ''}
                        /> : this.renderDefaultContent()}
                </section>

                <ChateauListViewComponent>
                    {this.props.chateauPosts ? this.props.chateauPosts
                        .map((item: ChateauPost, i) => <ChateauItem key={i} item={item} />) : 'loading posts'}
                </ChateauListViewComponent>
            </div>);
    }
    renderDefaultContent(): React.ReactNode {
        return (
            <div>
                <h1>Het chateau voor onvergetelijke vakantie voor u (en uw kinderen)</h1>

                <p>Het Chateau vormt het middelpunt van het park. Een bijzonder gebouw voor deze streek omdat het traditionele Normandische vakwerk deels terugkomt in de bouw.
 Wat kunt u allemaal vinden in het Chateau:</p>

                <ul>
                    <li>Het restaurant waar zowel &agrave; la carte gegeten kan worden, maar wat ook gebruikt wordt voor thema avonden (buffet, animatieavonden)</li>
                    <li>Een bar</li>
                    <li>Op de beneden verdieping bij het zwembad een snackbar</li>
                    <li>De dagelijkse bakker waar u veel soorten vers brood kunt kopen</li>
                    <li>De Pizzabus die elke maandagavond voor het Chateaux verse pizza’s (afhaal) verzorgt</li>
                    <li>Lees- en computerhoek</li>
                    <li>Open haard met gezellige zithoek</li>
                    <li>Een kleine bibliotheek waar u boeken kunt lenen</li>
                    <li>Mega groot TV-scherm voor films en belangrijke sportevenementen (Tour de France, voetbalkampioenschappen en in 2012 de Olympische Spelen).</li>
                    <li>Animatieruimte met disco op de benedenverdieping. Uiteraard met perfecte geluidsisolatie zodat overige gasten er weinig tot geen last van hebben.</li>
                    <li>Kleine fitnessruimte</li>
                </ul>
            </div>
        );
    }
}
export const ChateauPage = connect(mapStateToProps, mapDispatchToProps)(ChateauPageComponent);