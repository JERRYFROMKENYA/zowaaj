// import { Cloudinary } from "@cloudinary/url-gen";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "cloudinary-react-native"

import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

export const cld = new Cloudinary({
  cloud: {
    cloudName: 'dqkgbmvam'
  }
});