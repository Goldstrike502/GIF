import * as React from 'react';
import './Chateau.css';

interface Props {
    items?: any[];
}

export const ChateauListViewComponent: React.StatelessComponent<Props> = props => {
    return (
        <div className="chateau-list-view">
            <ul className="list">
                {/* {props.children} */}
            </ul>
            <div className="chateau-intro">
                <h1>Vakantiepark Chateau Cazaleres</h1>
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
                <button className="button">Meer informatie</button>     
        </div>
    </div>
                );
};