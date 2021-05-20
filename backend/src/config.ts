import {google} from 'googleapis';

export const oauth2Client = new google.auth.OAuth2(
    '769302200300-fbhuhmvis40o4evi55757jp3fej15tek.apps.googleusercontent.com',
    'gnLV_f1aIVzXsp93UqHZCSpz',
    'http://localhost:4000/api/users/google/getGoogleAuthCallback'
);

export const redirectUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['email', 'profile']
});
