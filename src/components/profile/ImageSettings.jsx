import { ImageUpload } from '../ImageUpload';

import UserService from '../../services/User.service';

export function ImageSettings({ user }) {

    return (
        <>
            <h2>Image Settings</h2>
            <div>
                <h3>Profile Image</h3>
                <ImageUpload defaultImage={user.avatar} onUpload={UserService.updateProfileImage} onDelete={UserService.deleteProfileImage}/>

            </div>
            <div>
                <h3>Profile Banner</h3>
                <ImageUpload defaultImage={user.banner} onUpload={UserService.updateProfileBanner} onDelete={UserService.deleteProfileBanner} />
            </div>
        </>
    );
}