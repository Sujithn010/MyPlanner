exports.getIndex = (req,res,next) => {
    res.render('index',{
        isAuthenticated: req.session.isLoggedIn
    });
}

exports.getStarted = (req,res,next) => {
    res.render('getStarted',{
        isAuthenticated: req.session.isLoggedIn
    });
}

exports.makeNotes = (req,res,next) => {
    res.render('makeNotes',{
        isAuthenticated: req.session.isLoggedIn,
          hasError:false,
          errorMessage: null,
          validationErrors: []
    });
}

exports.getTodo = (req,res,next) => {
    res.render('todo',{
        isAuthenticated: req.session.isLoggedIn
    });
}

exports.getScheduleMaker = (req,res,next) => {
    res.render('scheduleMaker',{
        isAuthenticated: req.session.isLoggedIn
    });
}