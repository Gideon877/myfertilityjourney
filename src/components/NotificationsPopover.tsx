import React from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    IconButton,
    Divider,
    Button,
    Popover,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

const NotificationItem: React.FC<{
    title: string,
    name: string,
    date: string,
    avatarSrc: string,
}> = ({ title, name, date, avatarSrc }) => (
    <>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={name} src={avatarSrc} />
            </ListItemAvatar>
            <ListItemText
                primary={title}
                secondary={
                    <>
                        <Typography component="span" variant="body2" color="text.primary">
                            {name}
                        </Typography>
                        {` — ${date}`}
                    </>
                }
            />
            <IconButton aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </ListItem>
        <Divider variant="inset" component="li" />
    </>
);

const NotificationsPopover: React.FC<{
    anchorEl: any,
    onClose: () => void,
    open: boolean,
}> = ({ anchorEl, onClose, open }) => {
    return (
        <Popover
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Box sx={{ p: 2, width: 360, height: 327 }}>
                <Typography variant="h6" gutterBottom>
                    Notifications
                </Typography>
                <Typography variant="body2" gutterBottom>
                    You have 2 unread messages
                </Typography>
                <List>
                    <Divider/>
                    <NotificationItem
                        title="New Registration"
                        name="Alex Fredricks"
                        date="07 Oct 2022"
                        avatarSrc="https://randomuser.me/api/portraits/men/1.jpg"
                    />
                    <NotificationItem
                        title="New Constent Added"
                        name="Blake Robertson"
                        date="07 Oct 2022"
                        avatarSrc="https://randomuser.me/api/portraits/men/2.jpg"
                    />
                </List>
                <Button fullWidth variant="text" sx={{ mt: 1, mb: 0, textTransform: 'none' }}>
                    Clear All
                </Button>
            </Box>
        </Popover>
    );
};

export default NotificationsPopover;