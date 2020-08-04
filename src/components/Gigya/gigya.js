import React, { Component } from 'react'
import GigyaGlobalEvents from '@s-ui/react-gigya-global-events'

class Gigya extends Component {
    componentWillMount(){
            const script = document.createElement('script');
            script.src = "https://cdn.gigya.com/js/gigya.js?apikey=3_IVyRclYYkhVkoGh3mXZROuRi_aMqPxcFXAbcnb5C3nxkSLq9D6PF_MHWVMUI98Bo";
            script.async = true;
            document.body.appendChild(script);
    }
    state = {
        "loaded": true
    }

    render(){
        
        // gigya.socialize.showLoginUI( {
        //     version: 2,
        //     containerID: "social_login_widget",
        //     siteName: 'tumtiki.tv',
        //     enabledProviders: 'facebook,googleplus,yahoo',
        //     buttonsStyle: 'fullLogoColored',
        //     showTermsLink: false,
        //     hideGigyaLink: true,
        //     width: 280,
        //     height: 50,
          
        //     //redirectURL: "/fid_portal/social_auth?client=" + window.client,
          
        //     //- authFlow: 'redirect',
        //     //- headerText: 'Login with...',
        //     //- lastLoginIndication: 'welcome',
        //     //- lastLoginIndication: 'none',
        //     //- lastLoginButtonSize: 20,
        //   });
        return(
            <div id="social_login_widget"></div>
        )
    }

}
export default Gigya