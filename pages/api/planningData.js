export default function handler(req, res) {
    res.status(200).json([{
        "id": 1,
        "cohort": "2022-2023",
        "schoolYearIds": [1, 2, 3],
        "periods": [{
            "id": 1,
            "period": [35],
            "typeId": 1,
            "schoolYearId": 1,
            "note": "periode 1"
        }, {
            "id": 2,
            "period": [37, 39],
            "typeId": 1,
            "schoolYearId": 1,
            "note": "periode 2"
        }, {
            "id": 3,
            "period": [37, 39, 40],
            "typeId": 1,
            "schoolYearId": 2,
            "note": "periode 2"
        }]
    }]
    )
};