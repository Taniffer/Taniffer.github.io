/**
 * Created by Alex on 2017/6/23.
 */
import React from 'react'
import OpernList from './OpernList'
import {Button} from 'antd'

export default class OpernPanel extends React.Component {
    render() {
        return (
            <div>
                <div className="opern-panel-button-container">
                    <Button type="primary">新增曲谱</Button>
                    <Button type="primary">作业管理</Button>
                </div>
                <OpernList/>
            </div>)
    }
}