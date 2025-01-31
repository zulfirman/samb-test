package config

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/zulfirman/zhelper"
	"main-service/src/model"
)

func Alive(c echo.Context) error {
	return zhelper.RsSuccess(c)
}

func MigrateDatabase(c echo.Context) error {
	err := DB.AutoMigrate(
		&model.M_user{},
		&model.M_customer{},
		&model.M_product{},
		&model.M_supplier{},
		&model.T_goods_receipt{},
		&model.T_goods_receipt_detail{},
		&model.T_goods_release{},
		&model.T_goods_release_detail{},
		&model.T_product_stock{},
	)

	// dummy data
	var scan any
	DB.Raw(`INSERT INTO "public"."m_user" ("id", "image", "email", "password", "first_name", "last_name", "gender", "type_user", "token_version", "created_at", "created_by", "updated_at", "updated_by", "deleted_at") VALUES (-1, 'default.webp', 'zul@gmail.com', '186cf774c97b60a1c106ef718d10970a6a06e06bef89553d9ae65d938a886eae', 'Zul', NULL, 'male', 1, 1, '2025-01-31 11:30:33', NULL, '2025-01-31 11:30:35', NULL, NULL)`).Scan(&scan)
	DB.Raw(`INSERT INTO "public"."m_product" ("id", "product_name", "created_at", "created_by", "updated_at", "updated_by", "deleted_at")
	VALUES
	(1, 'Shampoo', '2025-01-31 11:45:17', NULL, '2025-01-31 11:45:17', NULL, NULL),
	(2, 'Conditioner', '2025-01-31 11:46:30', NULL, '2025-01-31 11:46:30', NULL, NULL),
	(3, 'Body Wash', '2025-01-31 11:47:10', NULL, '2025-01-31 11:47:10', NULL, NULL),
	(4, 'Face Cream', '2025-01-31 11:48:05', NULL, '2025-01-31 11:48:05', NULL, NULL),
	(5, 'Hand Soap', '2025-01-31 11:49:20', NULL, '2025-01-31 11:49:20', NULL, NULL),
	(6, 'Toothpaste', '2025-01-31 11:50:33', NULL, '2025-01-31 11:50:33', NULL, NULL),
	(7, 'Mouthwash', '2025-01-31 11:51:45', NULL, '2025-01-31 11:51:45', NULL, NULL),
	(8, 'Sunscreen', '2025-01-31 11:52:15', NULL, '2025-01-31 11:52:15', NULL, NULL),
	(9, 'Lip Balm', '2025-01-31 11:53:40', NULL, '2025-01-31 11:53:40', NULL, NULL),
	(10, 'Hair Gel', '2025-01-31 11:54:25', NULL, '2025-01-31 11:54:25', NULL, NULL),
	(11, 'Hair Spray', '2025-01-31 11:55:50', NULL, '2025-01-31 11:55:50', NULL, NULL),
	(12, 'Perfume', '2025-01-31 11:56:30', NULL, '2025-01-31 11:56:30', NULL, NULL),
	(13, 'Deodorant', '2025-01-31 11:57:15', NULL, '2025-01-31 11:57:15', NULL, NULL),
	(14, 'Body Lotion', '2025-01-31 11:58:05', NULL, '2025-01-31 11:58:05', NULL, NULL),
	(15, 'Shaving Cream', '2025-01-31 11:59:10', NULL, '2025-01-31 11:59:10', NULL, NULL),
	(16, 'Aftershave', '2025-01-31 12:00:45', NULL, '2025-01-31 12:00:45', NULL, NULL),
	(17, 'Hand Sanitizer', '2025-01-31 12:01:20', NULL, '2025-01-31 12:01:20', NULL, NULL),
	(18, 'Foot Cream', '2025-01-31 12:02:30', NULL, '2025-01-31 12:02:30', NULL, NULL),
	(19, 'Makeup Remover', '2025-01-31 12:03:50', NULL, '2025-01-31 12:03:50', NULL, NULL);`).Scan(&scan)
	DB.Raw(`INSERT INTO "public"."m_customer" ("id", "customer_name", "created_at", "created_by", "updated_at", "updated_by", "deleted_at")
	VALUES
	(1, 'Mira', '2025-01-31 11:44:38', NULL, '2025-01-31 11:44:38', NULL, NULL),
	(2, 'Andi', '2025-01-31 11:45:50', NULL, '2025-01-31 11:45:50', NULL, NULL),
	(3, 'Siti', '2025-01-31 11:46:30', NULL, '2025-01-31 11:46:30', NULL, NULL),
	(4, 'Budi', '2025-01-31 11:47:15', NULL, '2025-01-31 11:47:15', NULL, NULL),
	(5, 'Rina', '2025-01-31 11:48:25', NULL, '2025-01-31 11:48:25', NULL, NULL),
	(6, 'Joko', '2025-01-31 11:49:10', NULL, '2025-01-31 11:49:10', NULL, NULL),
	(7, 'Dewi', '2025-01-31 11:50:05', NULL, '2025-01-31 11:50:05', NULL, NULL),
	(8, 'Agus', '2025-01-31 11:51:40', NULL, '2025-01-31 11:51:40', NULL, NULL),
	(9, 'Tina', '2025-01-31 11:52:15', NULL, '2025-01-31 11:52:15', NULL, NULL),
	(10, 'Rudi', '2025-01-31 11:53:30', NULL, '2025-01-31 11:53:30', NULL, NULL)`).Scan(&scan)
	DB.Raw(`INSERT INTO "public"."m_supplier" ("id", "supplier_name", "created_at", "created_by", "updated_at", "updated_by", "deleted_at")
	VALUES
	(1, 'PT Supplier Sejahtera', '2025-01-22 11:47:05', NULL, '2025-01-30 11:47:08', NULL, NULL),
	(2, 'CV Makmur Jaya', '2025-01-23 10:30:15', NULL, '2025-01-30 12:15:20', NULL, NULL),
	(3, 'UD Sentosa Bersama', '2025-01-24 09:20:45', NULL, '2025-01-30 13:05:30', NULL, NULL),
	(4, 'PT Abadi Sukses', '2025-01-25 08:10:55', NULL, '2025-01-30 14:25:40', NULL, NULL),
	(5, 'CV Karya Mandiri', '2025-01-26 07:45:10', NULL, '2025-01-30 15:10:50', NULL, NULL),
	(6, 'PT Jaya Makmur', '2025-01-27 06:35:25', NULL, '2025-01-30 16:45:55', NULL, NULL),
	(7, 'UD Sumber Rezeki', '2025-01-28 05:55:30', NULL, '2025-01-30 17:30:05', NULL, NULL),
	(8, 'PT Sukses Selalu', '2025-01-29 04:50:40', NULL, '2025-01-30 18:15:10', NULL, NULL),
	(9, 'CV Maju Terus', '2025-01-30 03:40:55', NULL, '2025-01-30 19:05:20', NULL, NULL),
	(10, 'UD Harapan Baru', '2025-01-31 02:30:05', NULL, '2025-01-30 20:10:30', NULL, NULL)`).Scan(&scan)
	DB.Raw(`INSERT INTO "public"."m_warehouse" ("id", "warehouse_name", "created_at", "created_by", "updated_at", "updated_by", "deleted_at")
	VALUES
	(2, 'Warehouse Jakarta', '2025-01-22 10:30:20', NULL, '2025-02-01 12:15:25', NULL, NULL),
	(3, 'Warehouse Surabaya', '2025-01-23 09:15:35', NULL, '2025-02-01 13:05:40', NULL, NULL),
	(4, 'Warehouse Medan', '2025-01-24 08:05:50', NULL, '2025-02-01 14:25:55', NULL, NULL),
	(5, 'Warehouse Makassar', '2025-01-25 07:20:10', NULL, '2025-02-01 15:10:30', NULL, NULL),
	(6, 'Warehouse Bali', '2025-01-26 06:45:25', NULL, '2025-02-01 16:45:15', NULL, NULL)`).Scan(&scan)
	// end dummy data

	if err != nil {
		fmt.Println(err)
	}
	return zhelper.RsSuccess(c)
}
