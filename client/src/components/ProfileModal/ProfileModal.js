import { Modal, useMantineTheme } from '@mantine/core';
import '../../pages/Auth/Auth.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser } from '../../actions/userAction';

const ProfileModal = ({ modalOpened, setmodalOpened, data }) => {

    const theme = useMantineTheme();
    const { password, ...other } = data;
    const [formData, setformData] = useState(other);
    const [profileImage, setprofileImage] = useState("");
    const [coverImage, setcoverImage] = useState("");
    const dispatch = useDispatch();
    const param = useParams();
    const { user } = useSelector(state => state.authReducer.authData);


    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) => {
        let res = "";
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = () => {
                res = reader.result //base64encoded string
                e.target.name === 'coverPicture' ? setcoverImage(res) : setprofileImage(res);
            };

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let UserData = formData;
        if (profileImage) {
            UserData.profilePicture = profileImage;
        }
        if (coverImage) {
            UserData.coverPicture = coverImage;
        }
        console.log("user data ", UserData);
        dispatch(updateUser(UserData, param.id));
        setmodalOpened(false);
    }

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
                        placeholder='First Name'
                        onChange={handleChange}
                        value={formData.firstname}
                    />

                    <input type="text"
                        className='infoInput'
                        name='lasttname'
                        placeholder='Last Name'
                        onChange={handleChange}
                        value={formData.lastname}
                    />
                </div>
                <div>
                    <input type="text"
                        className='infoInput'
                        name='university'
                        placeholder='University'
                        onChange={handleChange}
                        value={formData.university}
                    />
                </div>
                <div>
                    <input type="text"
                        className='infoInput'
                        name='country'
                        placeholder='Country'
                        onChange={handleChange}
                        value={formData.country}
                    />

                    <input type="text"
                        className='infoInput'
                        name='livesin'
                        placeholder='Lives In'
                        onChange={handleChange}
                        value={formData.livesin} />
                </div>
                <div>
                    <input type="text"
                        name="status"
                        className='infoInput'
                        placeholder='Status'
                        onChange={handleChange}
                        value={formData.status}
                    />
                </div>

                <div>
                    Profile Image
                    <input type="file" name="profilePicture" onChange={handleImageChange} />
                    Cover Imgae
                    <input type="file" name="coverPicture" onChange={handleImageChange} />
                </div>

                <button className='button infoButtton' onClick={handleSubmit}> Update </button>
            </form>
        </Modal>
    );
}

export default ProfileModal