export type User = {
    id: string,
    name: string,
    email: string,
    password: string,
    profile_image: string
}

export type TxnSummary = {
    id: string,
    total_balance: number,
    lend_balance: number,
    borrow_balance: number,
    lend_list: Lend_Borrow_List[],
    borrow_list: Lend_Borrow_List[],
    recent_txn_list: Recent_Txn[],
}

export type Lend_Borrow_List = {
    txn_id: string,
    user_id: string,
    profile_image: string,
    name: string,
    amount: number,
    txn_date: number,
    txn_reason: string,
}

export type Recent_Txn = {
    txn_type: string,
    txn_id: string,
    amount: number,
    txn_date: number,
    txn_with: string,
    txn_reason: string,
}

export type AddTransactions = {
    id: string,
    txn_amount: number,
    currency: string,
    user_id : string,
    txn_type: string,
    txn_date: number,
    txn_reason: string,
}

export type SettleTansactions = {
    id: string,
    status: string,
    txn_type: string;
    txn_id: string,
    amount: string,
    lender_id: string,
    borrower_id: string
}

