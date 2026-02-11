import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext, SERVERURL, IMAGE_BASE_URL } from '../client/data-context';
import Contact from '../client/Contact';
import { useTheme } from '@mui/material/styles';
import { 
    CelebrationOutlined, 
    SportsEsportsOutlined, 
    FastfoodOutlined,
    LocalActivityOutlined 
} from '@mui/icons-material';

export default function MainPage() {
    const navigation = useNavigate();
    const cotx = useContext(DataContext);
    const theme = useTheme();

    const categories = [
        { 
            title: 'מתנפחים', 
            icon: CelebrationOutlined, 
            color: theme.palette.primary.main,
            description: 'מגוון רחב של מתנפחים מרהיבים'
        },
        { 
            title: 'משחקים', 
            icon: SportsEsportsOutlined, 
            color: theme.palette.secondary.main,
            description: 'משחקים מהנים לכל הגילאים'
        },
        { 
            title: 'מכונות מזון', 
            icon: FastfoodOutlined, 
            color: theme.palette.accent.main,
            description: 'פופקורן, סוכר מסוכר ועוד'
        },
        { 
            title: 'אטרקציות', 
            icon: LocalActivityOutlined, 
            color: theme.palette.purple.main,
            description: 'אטרקציות מיוחדות לאירועים'
        },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.light}40 0%, ${theme.palette.secondary.light}40 100%)`,
                    py: { xs: 6, md: 10 },
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={7}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    fontWeight: 800,
                                    mb: 2,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                מורשת
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: { xs: '1.5rem', md: '2rem' },
                                    fontWeight: 600,
                                    mb: 3,
                                    color: theme.palette.text.primary,
                                }}
                            >
                                החוויה המושלמת
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                                    mb: 4,
                                    color: theme.palette.text.secondary,
                                    lineHeight: 1.7,
                                }}
                            >
                                השכרת ציוד ומשחקים לאירועים מכל הסוגים.
                                <br />
                                הפכו את האירוע שלכם לחוויה בלתי נשכחת!
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => navigation('/album')}
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 700,
                                        px: 4,
                                        py: 1.5,
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                        boxShadow: `0px 8px 24px ${theme.palette.primary.main}50`,
                                        '&:hover': {
                                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                                            boxShadow: `0px 12px 32px ${theme.palette.primary.main}70`,
                                        }
                                    }}
                                >
                                    צפו בקטלוג
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => navigation('/contact')}
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 700,
                                        px: 4,
                                        py: 1.5,
                                        borderWidth: 2,
                                        borderColor: theme.palette.secondary.main,
                                        color: theme.palette.secondary.main,
                                        '&:hover': {
                                            borderWidth: 2,
                                            borderColor: theme.palette.secondary.dark,
                                            backgroundColor: theme.palette.secondary.main + '10',
                                        }
                                    }}
                                >
                                    קבלת הצעת מחיר
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Categories Section */}
            <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
                <Typography
                    variant="h3"
                    align="center"
                    sx={{
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        fontWeight: 700,
                        mb: 6,
                        color: theme.palette.text.primary,
                    }}
                >
                    הקטגוריות שלנו
                </Typography>
                <Grid container spacing={3}>
                    {categories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Box
                                    onClick={() => navigation('/album')}
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        backgroundColor: 'white',
                                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: `0px 12px 32px ${category.color}30`,
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 16px',
                                            backgroundColor: category.color + '20',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <Icon sx={{ fontSize: 40, color: category.color }} />
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                        {category.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {category.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>

            {/* Contact Section */}
            <Box sx={{ backgroundColor: theme.palette.background.light, py: { xs: 6, md: 8 } }}>
                <Contact />
            </Box>
        </Box>
    );
}
