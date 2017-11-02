import { ChateauPost } from '../../Types/index';
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
            {props.intro ? <div className="chateau-intro">
                <h1>Vakantiepark Chateau Cazaleres</h1>
                <hr />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum erat felis,
                    eget volutpat nisl aliquam ut. Aliquam et sollicitudin sem.
                   Morbi sit amet dictum sem. Praesent congue eget elit in sollicitudin. 
                   Nam a congue dui. Sed tristique efficitur convallis. Nulla vitae ornare 
                   nibh, id ornare augue. Suspendisse ut faucibus velit, et convallis arcu. 
                   Aenean facilisis aliquam nisl ut condimentum. Donec rhoncus diam fringilla 
                   neque convallis, quis iaculis nisl aliquet. Integer vel erat mauris. </p>
                <p>Praesent sit amet ante at diam molestie lobortis. 
                    Donec et mauris tempor, consectetur elit non, iaculis leo. Fusce tincidunt maximus 
                    urna, non dignissim massa semper at. Duis dapibus dictum mauris, eget bibendum massa.
                     Pellentesque semper in arcu ac scelerisque. Vestibulum in ex pellentesque, 
                     imperdiet est hendrerit, aliquam urna. Nulla eget suscipit diam. 
                     Suspendisse rutrum non enim sit amet iaculis.
                </p>
                <Link to="/chateau" className="button">Informatie over Chateau Cazaleres</Link>
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
            <Link to={'/chateau/' + props.item.slug}>
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
