<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 80%">
            <el-table-column
                    fixed
                    prop="id"
                    label="编号"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="书名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="author"
                    label="作者"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="publish"
                    label="出版社"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="pages"
                    label="页数"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="bookcaseid"
                    label="书柜"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    width="150"
                    >
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="deleteBook(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
                background
                layout="prev, pager, next"
                page-size="6"
                :total="total"
                @current-change="page"
        >
        </el-pagination>
    </div>

</template>

<script>
    export default {
        methods: {
            deleteBook(row) {
                const _this = this
                axios.delete('http://localhost:8181/book/delete/' + row.id).then(function (resp) {
                    _this.$alert('《' + row.name + '》删除成功！', '消息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            window.location.reload()
                        }
                    })
                })
            },
            edit(row) {
                this.$router.push({
                    path: '/update',
                    query: {
                        id: row.id
                    }
                })
            },
            page(currentPage) {
                const _this = this
                axios.get('http://localhost:8181/book/findAll/' + currentPage + '/6').then(function (resp) {
                    _this.tableData = resp.data.records
                    _this.total = resp.data.total
                })
            }
        },
        created() {
            const _this = this
            axios.get('http://localhost:8181/book/findAll/1/6').then(function (resp) {

                _this.tableData = resp.data.records
                _this.total = resp.data.total
            })

        },
        data() {
            return {
                total: null,
                tableData: null,
                createdTime:null,
                updatedTime:null
            }
        }
    }
</script>