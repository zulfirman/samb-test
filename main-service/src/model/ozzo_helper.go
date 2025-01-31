package model

import (
	"errors"
	"fmt"
	"strings"
)

func BlankString(value interface{}) error {
	stringText := fmt.Sprintf("%v", value)
	errorMessage := "空白にできません"
	if stringText == "" {
		return errors.New(errorMessage)
	}
	if stringText == "" || strings.TrimSpace(stringText) == "" || strings.HasPrefix(stringText, " ") {
		return errors.New(errorMessage)
	}
	return nil
}

func isNotZero(s interface{}) error {
	newVal := 0
	switch s.(type) {
	case int64:
		newVal = int(s.(int64))
	case float32:
		newVal = int(s.(float32))
	case int:
		newVal = s.(int)
	}
	if newVal == 0 {
		return errors.New("must be a number")
	}
	return nil
}

func moreThanZero(s interface{}) error {
	newVal := 0
	switch s.(type) {
	case int64:
		newVal = int(s.(int64))
	case float32:
		newVal = int(s.(float32))
	case int:
		newVal = s.(int)
	}
	if newVal < 0 {
		return errors.New("must be positive number")
	}
	return nil
}
