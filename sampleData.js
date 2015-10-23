//remove this later

exports.commentLog = 
            {
                comments:[
                    {playerId:123, userName: "Jeff", comment:"This is a test comment", dateId: new Date(), commentId: "1z5b"},
                    {playerId:123, userName: "Bekah", comment:"This is a test comment", dateId: new Date(), commentId: "1z5b"},
                    {playerId:123, userName: "Alexis", comment:"This is a test comment", dateId: new Date(), commentId: "1z5b"},
                    {playerId:123, userName: "Hailey", comment:"This is a test comment", dateId: new Date(), commentId: "1z5b"},
                    {playerId:456, userName: "Hannah", comment:"This is a test comment", dateId: new Date(), commentId: "1z5b"},
                    {playerId:456, userName: "Lily", comment:"This is a test comment", dateId: new Date(), commentId: "1z5b"},
                    {playerId:456, userName: "Bekah", comment:"This is a test comment", dateId: new Date(), commentId: "1z5b"},
                ]
            };


exports.playerData = {
data:[{
MaxSlot:0.18,
MaxTable:0.15,
MidSlot:0.17,
MidTable:0.12,
MinSlot:0.16,
MinTable:0.1,
PlayerID:123,
Name:"CRAIG ABBOTT",
Status:"Elite",
PointBal:'69,996',
PointBalVal:69,
Slot_CI:"1,193",
Slot_JP:0,
Slot_Act:-43,
Slot_Theo:54,
ActvTheo:-0.8,
ActvTheoNum:-0.801270,
Slots_FreePlayPromo:10,
Slots_FreePlayPoints:0,
Slots_FreePlayDrawing:0,
Slot_FreePlayTotal:10,
Slot_AvgBet:1.58,
Slot_BasePTs:861,
Slot_BonusPts:0,
Slot_TotalPts:861,
Slot_PtsCost:0.861,
Slot_NetWin:-53,
Slot_NetTheo:44,
Table_Act:0,
Table_Theo:0,
Table_Time:0,
BingoWrite:0,
GADT:22,
GADW:-26,
Gaming_Days:2,
Gaming_Theo:44,
Gaming_Win:-53,
Comp_Max:0,
Comp_Mid:0,
Comp_Min:0,
Comp_MaxAct:0,
Comp_MidAct:0,
Comp_MinAct:0,
Comp_MaxNoFSP:8,
Comp_MidNoFSP:8,
Comp_MinNoFSP:7,
Comp_MaxNoKiosk:8,
Comp_MidNoKiosk:8,
Comp_MinNoKiosk:7,
CompIssued:0,
Comp_Total:0,
Comp_Total_Class: "redFont",
PatronCoupons:0,
KioskCoupons:0,
Total_Coupons:0,
Total_Days:2,
Total_Expenses:11,
NetTheo:43,
NetWin:-54,
TheoReinvest:"20.29 %",
ActualReinvest:"-25.32 %",
Gaming_PointComp:0,
NonGaming_PointComp:0,
Total_PointComp:0,
Total_PtsCost:1,
Comp_Concert:0,
Comp_FNB:0,
Comp_Hotel:0,
Comp_Nightlife:0,
Comp_Other:0,
Comp_Retail:0,
Comp_SPA:0,
StartDate:"2015-09-01",
EndDate:"2015-09-30",
Days:29
},{
MaxSlot:0.18,
MaxTable:0.15,
MidSlot:0.17,
MidTable:0.12,
MinSlot:0.16,
MinTable:0.1,
PlayerID:456,
Name:"JANE DOE",
Status:"Star",
PointBal:"69,996",
PointBalVal:69,
Slot_CI:"12,193",
Slot_JP:0,
Slot_Act:-43,
Slot_Theo:54,
ActvTheo:-0.8,
ActvTheoNum:-0.801270,
Slots_FreePlayPromo:10,
Slots_FreePlayPoints:0,
Slots_FreePlayDrawing:0,
Slot_FreePlayTotal:10,
Slot_AvgBet:1.58,
Slot_BasePTs:861,
Slot_BonusPts:0,
Slot_TotalPts:861,
Slot_PtsCost:0.861,
Slot_NetWin:-53,
Slot_NetTheo:44,
Table_Act:0,
Table_Theo:0,
Table_Time:0,
BingoWrite:0,
GADT:22,
GADW:-26,
Gaming_Days:2,
Gaming_Theo:44,
Gaming_Win:-53,
Comp_Max:0,
Comp_Mid:0,
Comp_Min:0,
Comp_MaxAct:0,
Comp_MidAct:0,
Comp_MinAct:0,
Comp_MaxNoFSP:8,
Comp_MidNoFSP:8,
Comp_MinNoFSP:7,
Comp_MaxNoKiosk:8,
Comp_MidNoKiosk:8,
Comp_MinNoKiosk:7,
CompIssued:0,
Comp_Total:0,
Comp_Total: "redFont",
PatronCoupons:0,
KioskCoupons:0,
Total_Coupons:0,
Total_Days:2,
Total_Expenses:11,
NetTheo:43,
NetWin:-54,
TheoReinvest:"20.29 %",
ActualReinvest:"-25.32 %",
Gaming_PointComp:0,
NonGaming_PointComp:0,
Total_PointComp:0,
Total_PtsCost:1,
Comp_Concert:0,
Comp_FNB:0,
Comp_Hotel:0,
Comp_Nightlife:0,
Comp_Other:0,
Comp_Retail:0,
Comp_SPA:0,
StartDate:"2015-09-01",
EndDate:"2015-09-30",
Days:29
}]};

exports.loginData = {
    users:[
        {userId: "jeff", password: "jeff", accessLevel: 1},
        {userId: "bekah", password: "bekah", accessLevel: 1},
        {userId: "lily", password: "lily", accessLevel: 0},
    ]
};

exports.playerLookupData = {
    players:[
        {PlayerID: 456, FirstName: "John", LastName: "Dough", AgeRange: "35-45", 
         City: "Henderson", State: "NV", RankDesc: "Something", Birthday: new Date('01/30/1965')},
        {PlayerID: 123, FirstName: "Sue", LastName: "Shoe", AgeRange: "35-45", 
         City: "Henderson", State: "NV", RankDesc: "Something", Birthday: new Date('05/01/1933')}
    ]
};