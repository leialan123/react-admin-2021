import React, { Component } from "react";
import { Pagination, Button, Select, Input } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import styles from "./index.module.less";

const { Option } = Select;

class Paging extends Component {
  state = {
    current: 1, // 当前页数
    total: 55, // 数据总数
    pageSize: 10, // 每页显示条数
    pageSizeOptions: [10, 20, 30], // 指定每页显示条数
    showPageSizeOptions: false, // 是否显示指定每页条数选择
    showJumperPage: false,// 是否显示跳页
    jumperPage: "", // 跳页数
  };

  // 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
  onChange = (current, pageSize) => {
    console.log("当前页：" + current, "每页显示条数：" + pageSize);
  };

  // pageSize 变化的回调
  onShowSizeChange = (pageValue) => {
    const { current, total, pageSize } = this.state;
    const pageLength =
      total % pageSize === 0
        ? total / pageSize
        : Math.floor(total / pageSize) + 1;

    switch (pageValue) {
      case "prev":
        if (current - 1 >= 0) {
          this.setState({
            current: current - 1,
          });
        }
        break;
      case "next":
        if (current + 1 <= pageLength) {
          this.setState({
            current: current + 1,
          });
        }
        break;

      default:
        // * 表示前面的子表达式匹配0次或更多次
        // ？匹配前面的子表达式零次或一次，或指明一个非贪婪限定符。要匹配 ? 字符，请使用 \?
        // \d 匹配数字
        // + 匹配前面的子表达式一次或多次。要匹配 + 字符，请使用 \+
        const reg = /^-?[1-9]+[0-9]*$/

        if(!reg.test(pageValue)) {
          pageValue = current
        } else if(Number(pageValue) < 1){
          pageValue = 1
        } else if(Number(pageValue) > pageLength){
          pageValue = pageLength
        } 

        this.setState({
          // current: pageValue,
          current: Number(pageValue),
        });
        break;
    }
  };

  // 每页显示条数
  onPageSizeOptionsChange = (pageVal) => {
    this.setState({
      pageSize: pageVal,
    });
  };

  render() {
    const {
      current,
      total,
      pageSize,
      pageSizeOptions,
      showPageSizeOptions,
      showJumperPage,
      jumperPage,
    } = this.state;
    const pageLength =
      total % pageSize === 0
        ? total / pageSize
        : Math.floor(total / pageSize) + 1;

    // console.log("current: ", current);
    // console.log("pageLength: ", pageLength);
    // console.log(current === 1);
    // console.log(current === pageLength);
    const width = "60";
    let pageArr = [];
    for (let i = 1; i <= pageLength; i++) {
      const obj = {
        key: i,
        page: i,
      };

      pageArr = [...pageArr, obj];
    }

    return (
      <div>
        <h1>分页组件</h1>
        <div className={styles.pageComponent}>
          <ul className={styles.pagination}>
            <li
              className={`${styles.paginationPrev} ${
                current === 1 ? styles.paginationDisabled : ""
              } `}
            >
              <Button
                onClick={() => {
                  // this.prevPage()
                  this.onShowSizeChange("prev");
                }}
                disabled={current === 1 ? true : false}
                icon={<LeftOutlined style={{ fontSize: "12px" }} />}
              />
            </li>
            {pageArr.map((value, key) => {
              return (
                <li
                  key={value.key}
                  className={`${styles.paginationItem} ${
                    value.page === current ? styles.paginationActive : ""
                  }`}
                >
                  <Button
                    type="link"
                    onClick={() => {
                      // this.getPageSize(value.page)
                      this.onShowSizeChange(value.page);
                    }}
                  >
                    {value.page}
                  </Button>
                </li>
              );
            })}
            <li
              className={`${styles.paginationNext} ${
                current === pageLength ? styles.paginationDisabled : ""
              }`}
            >
              <Button
                disabled={current === pageLength ? true : false}
                onClick={() => {
                  // this.nextPage()
                  this.onShowSizeChange("next");
                }}
                icon={<RightOutlined style={{ fontSize: "12px" }} />}
              />
            </li>
          </ul>

          <div style={{ marginLeft: "20px" }}>共{total}条</div>

          {showPageSizeOptions ? (
            <Select
              className={styles.pageSizeOptions}
              onChange={this.onPageSizeOptionsChange}
              defaultValue={pageSize}
              style={{ width: width }}
            >
              {pageSizeOptions.map((value, key) => {
                return (
                  <Option key={key} value={value}>
                    {value}
                  </Option>
                );
              })}
            </Select>
          ) : null}

          {
            showJumperPage ? <div className={styles.quickJumper}>
            跳到
            <Input
              value={jumperPage}
              onPressEnter={(event) => {
                this.onShowSizeChange(event.target.value);
                this.setState({
                  jumperPage: "",
                });
              }}
              onChange={(event) => {
                this.setState({
                  jumperPage: event.target.value,
                });
              }}
              style={{ width: "40px", margin: "0 10px" }}
            />
            页
          </div> : null
          }
          

          {/* <hr />
                <Pagination defaultCurrent={1} total={50} /> */}
        </div>
      </div>
    );
  }
}

export default Paging;
