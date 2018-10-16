import { CHATEAU_ROUTE_URL } from '../../Routes';
import { ChateauPost } from '../../Types/ContentTypes';
import * as React from 'react';
import './Chateau.css';
import { Link } from 'react-router-dom';

interface Props {
    items?: any[];
    intro?: boolean;
    children: string | JSX.Element[];
}

export const ChateauListViewComponent: React.StatelessComponent<Props> = props => {
    return (
        <div className="chateau-list-view">
            <ul className={!props.intro ? 'full-width list' : 'list'}>
                {props.children}
            </ul>
            {props.intro ?
                <div className="chateau-intro">
                    <h1>Vakantiepark Chateau Cazaleres</h1>
                    <hr />
                    <p>Het Chateau vormt het middelpunt van het park. Een bijzonder gebouw voor deze streek omdat het traditionele Normandische vakwerk deels terugkomt in de bouw.</p>
                    <Link to="/chateau-cazaleres" className="button">Informatie over Chateau Cazaleres</Link>
                </div>
                : ''}
        </div>
    );
};

interface ChateauItemProps {
    item: ChateauPost;
}
export const ChateauItem: React.StatelessComponent<ChateauItemProps> = props => {
    return (
        <div className="chateau-item">
            <Link to={CHATEAU_ROUTE_URL + '/' + props.item.slug}>
                <figure>
                    <img
                        src={props.item.cover.fields.file.url}
                        alt={props.item.cover.fields.description}
                        title={props.item.cover.fields.title}
                    />
                    <caption>
                        <h3> {props.item.title}</h3>
                        <p>{props.item.description}</p>
                    </caption>
                </figure>
            </Link>
        </div>
    );
};
