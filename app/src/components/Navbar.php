<?php

    // echo first part of header
    echo "
        <div id='header'>
            <div>
                <a id='title-a' href='/'>CRC</a>
                <div></div>
            </div>
    ";

    // check if the user is an admin user
    if ($is_admin) {
        // echo a link to the admin panel
        echo "
            <div class='admin'>
                <a href='/admin/'>Admin Panel</a>
                <div></div>
            </div>
        ";
    }

    // echo last part of header
    echo "
            <div class='general'>
                <a href='/services/search'>Find Services</a>
                <div></div>
            </div>
            <div class='general'>
                <a href='/services/create/'>New Service</a>
                <div></div>
            </div>
            <div>
                <a href='/dashboard/'>
                    <img id='dashboard-img' src='/media/icons/waffle.webp' title='Dashboard' alt='Dashboard'>
                </a>
            </div>
            <div>
                <a href='/user-account/'>
                    <img src='/media/icons/profile.webp' title='My Account' alt='My Account'>
                </a>
            </div>
        </div>
    ";