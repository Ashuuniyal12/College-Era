import { Modal, useMantineTheme } from '@mantine/core';
import PostShare from '../../PostShareComponent/PostShare';

const ShareModal = ({ modalOpened, setmodalOpened }) => {

    const theme = useMantineTheme();

    return (
        <Modal 
            opened={modalOpened}
            onClose={() => setmodalOpened(false)}
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size='55%'
        >
            <PostShare/>
        </Modal>
    );
}

export default ShareModal;