type Feedback = {
    user: string
    rating: number
    comment: string
}

type FillterFeedback = {
    label: string
    rating: string
    totalFB: number
    listFB: IFeedback[]
}
