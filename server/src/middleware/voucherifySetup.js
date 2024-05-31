const { VoucherifyServerSide } = require('@voucherify/sdk')


const voucherifyClient = VoucherifyServerSide({
    applicationId: '05c62791-96bb-4e2d-a8a4-177beacb5310',
    secretKey: 'a2d38550-0919-4974-9c27-0cedb3179630',
    apiUrl: 'https://as1.api.voucherify.io', 
})
module.exports = { voucherifyClient}