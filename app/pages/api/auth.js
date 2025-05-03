import { withIronSessionApiRoute } from 'iron-session/next';

async function handler(req, res) {
    const { action } = req.query;

    //guest login
    if (req.method === 'GET' && action === 'guest') {
        try {
            const guestId = uuidv4();
            const guestUser = {
                _id: guestId, 
                username: `guest_${guestId.substring(0,6)}`,

            };
            req.session.user = guestUser; 
            req.session.isGuest = true;
            await req.session.save();
            return res.status(200).json({user:guestUser});
        } catch (error){
            return res.status(500).json({error: "Failed to create guest session"});
        }
    }

    //signing in
    if (req.method === 'POST' && action === 'signin') {
        try {
            const {email, password } = req.body;
            //signin logic
            //
            //

            return req.status(200).json({user});
        } catch (error) {
            return res.status(500).json({error: "User login failed"});
        }
    }
    // signing out
    if (req.method === 'GET' && action === 'signout') {
        req.session.destroy();
        return res.status(200).json({ message: 'Signed out successfully' });
    }
    return res.status(405).json({error: 'Method not allowed'});
}
export default withIronSessionApiRoute(handler, sessionOptions);