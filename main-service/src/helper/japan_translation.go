package helper

import "github.com/zulfirman/zhelper"

func ListStatusCodeJapan(statusCode int) string {
	listCode := map[string]interface{}{}
	listCode["200"] = "成功"
	listCode["400"] = "要求の形式が正しくありません"
	listCode["401"] = "無許可"
	listCode["403"] = "禁断"
	listCode["404"] = "見つかりません"
	listCode["405"] = "メソッドは許可されていません"
	listCode["408"] = "リクエストタイムアウト"
	listCode["413"] = "ペイロードが大きすぎる"
	listCode["500"] = "内部サーバーエラー"
	statusCodeString := zhelper.IntString(statusCode)
	if !zhelper.KeyExists(listCode, statusCodeString) {
		return "ステタスはありません"
	}
	return listCode[statusCodeString].(string)
}
