import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory, useParams} from 'react-router-dom';
import NavigationBarAdmin from './layout/NavigationBarAdmin';
import Teams from './Teams';

const GetTeam = () => {
    return (
        <div>
        <NavigationBarAdmin />
        <Teams />
    </div>
    )
}

export default GetTeam;