import React, {useState, useEffect, Fragment} from 'react'
import {Api, useAuthDetails} from '../../core/components/BRIQAuthorization/BRIQAuth'

const Dashboard = () => {
    return (
        <Fragment>
            <div className="">
                HELOOW
                <a href='/signout'>LOGOUT</a>
            </div>
        </Fragment>
    )
}

export default Dashboard