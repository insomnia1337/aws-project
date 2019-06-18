import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function MadeWithLove() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Check project on my '}
            <Link color="inherit" href="https://github.com/insomnia1337/aws-project">
                {'Github'}
            </Link>

        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(2),
        marginTop: '400px',
        backgroundColor: 'white',
    },
}));

export default function StickyFooter() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Typography variant="body1">2019 Kraków</Typography>
                <MadeWithLove/>
            </Container>
        </footer>
    );
}
