package model

import (
	"gorm.io/gorm"
	"time"
)

type MainModel struct {
	CreatedAt time.Time      `json:"createdAt" gorm:"type:timestamp"`
	CreatedBy int64          `json:"createdBy"`
	UpdatedAt time.Time      `json:"updatedAt" gorm:"type:timestamp"`
	UpdatedBy int64          `json:"updatedBy"`
	DeletedAt gorm.DeletedAt `gorm:"index;type:timestamp" json:"-"`
}
