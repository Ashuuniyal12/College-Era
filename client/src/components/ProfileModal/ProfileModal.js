import { Modal, useMantineTheme } from '@mantine/core';
import '../../pages/Auth/Auth.css';

const ProfileModal = ({ modalOpened, setmodalOpened }) => {

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
            <form className="infoForm flex flex-col justify-center items-center gap-8 ">
                <h3>Your info</h3>

                <div>
                    <input type="text"
                        className='infoInput'
                        name='firstname'
                        placeholder='First Name' />

                    <input type="text"
                        className='infoInput'
                        name='lasttname'
                        placeholder='Last Name' />
                </div>
                <div>
                    <input type="text"
                        className='infoInput'
                        name='university'
                        placeholder='University' />
                </div>
                <div>
                    <input type="text"
                        className='infoInput'
                        name='Country'
                        placeholder='Country' />

                    <input type="text"
                        className='infoInput'
                        name='livesIn'
                        placeholder='Lives In' />
                </div>
                <div>
                    <input type="text"
                        name="status"
                        className='infoInput'
                        placeholder='Status'
                    />
                </div>

                <div>
                    Profile Image
                    <input type="file" name= "profileImage" />
                    Cover Imgae 
                    <input type="file" name ="coverImage" />
                </div>

                <button className='button infoButtton'> Update </button>
            </form>
        </Modal>
    );
}

export default ProfileModal