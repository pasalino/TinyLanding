'use strict';

const incrementVisitor = async (req, res) => {
    try {
        const response = {status: 200, success: 'Increment Successfully'};
        res.status(response.status);
        res.json(response);
    } catch (err) {
        const response = {status: 500, error: err};
        res.status(response.status);
        res.json(response);
    }
};

const token = async (req, res) => {
    try {
        res.json({token: token});
    } catch (err) {
        const response = {status: 500, error: err};
        res.status(response.status);
        res.json(response);
    }
};

module.exports = {
    incrementVisitor,
    token
};