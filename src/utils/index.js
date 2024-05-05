function validate(...validators) {
    return function (...args) {
        for (const validator of validators) {
            const validationResult = validator(...args);
            if (!validationResult.success) {
                return {
                    success: false,
                    msg: validationResult.msg
                };
            }
        }
        return { success: true, msg: '' };
    };
}


export { validate };